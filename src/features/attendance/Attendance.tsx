import { useState } from "react";
import { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AttendanceForm from "./AttendanceForm";
import AttendanceConfirm from "./AttendanceConfirm";
import AttendanceComplete from "./AttendanceComplete";
import { updateUser } from "../user-detail/userSlice";
import ErrorPage from "../error-page/ErrorPage";

enum Status {
  FORM,
  CONFIRM,
  COMPLETE
}

function Attendance() {
  const dispatch = useAppDispatch();
  const initialUser = useAppSelector((state: RootState) => state.user.val);
  const [status, setStatus] = useState(Status.FORM);
  const [user, setUser] = useState(initialUser);
  const [err, setError] = useState<Error>();

  switch (status) {
    case Status.FORM:
      return <AttendanceForm
                user={user}
                onConfirm={u => {
                  setUser(u);
                  setStatus(Status.CONFIRM);
                }}
              />;
    case Status.CONFIRM:
     return <AttendanceConfirm
              user={user}
              onBackButtonClicked={() => setStatus(Status.FORM)}
              onSaveSuccess={u => {
                setUser(u);
                dispatch(updateUser(u));
              }}
              onSaveError={setError}
              onSaveComplete={() => setStatus(Status.COMPLETE)}
            />;
    case Status.COMPLETE:
      return <AttendanceComplete err={err} />;
    default:
      return <ErrorPage err={{code: 500, message: `Unknown statu: ${status}`, descriptionKey: 'error.description.unknown'}}/>
  }

}

export default Attendance;