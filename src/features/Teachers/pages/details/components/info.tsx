import { useAppDispatch } from "@/app/store";
import {
  fireTeacher,
  returnTeacherFromVacation,
  sendTeacherOnVacation,
} from "@/features/Teachers/store/actions";
import { Teacher, TeacherStatus } from "@/features/Teachers/type";
import { Loading } from "@/shared/ui";
import FullScreenModal from "@/shared/ui/FullScreenModal";
import { PromptWithCommentModal } from "@/widgets";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Edit } from "@/features/Teachers/ui";
import { toastError } from "@/shared/libs";

const Info = ({
  isLoading,
  teacher,
}: {
  isLoading: boolean;
  teacher: Teacher;
}) => {
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState({
    edit: false,
    fire: false,
    toVacation: false,
    fromVacation: false,
  });

  const onFireTeacher = (comment: string = "") => {
    if (!comment) {
      toastError("Поле коммент обязательное");
    } else {
      const req = {
        comment,
        is_active: false,
        status: TeacherStatus.Fired,
      };
      dispatch(fireTeacher({ id: teacher.id, req }));
      setModal({ ...modal, fire: false });
    }
  };
  const onVacationTeacher = (comment: string = "") => {
    const req = {
      comment,
      status: TeacherStatus.Vacation,
      is_active: false,
    };
    dispatch(sendTeacherOnVacation({ id: teacher.id, req }));
    setModal({ ...modal, toVacation: false });
  };

  const returnFromVacationTeacher = (comment: string = "") => {
    const req = {
      comment,
      status: TeacherStatus.Working,
      is_active: true,
    };
    dispatch(returnTeacherFromVacation({ id: teacher.id, req }));
    setModal({ ...modal, fromVacation: false });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <FullScreenModal
        open={modal.edit}
        handleClose={() => setModal({ ...modal, edit: false })}
      >
        <Edit
          teacherId={teacher.id}
          onClose={() => setModal({ ...modal, edit: false })}
        />
      </FullScreenModal>
      <PromptWithCommentModal
        open={modal.fire}
        handleClose={() => setModal({ ...modal, fire: false })}
        text="Вы уверены уволить преподавателя?"
        agreeCallback={onFireTeacher}
      />
      <PromptWithCommentModal
        open={modal.toVacation}
        handleClose={() => setModal({ ...modal, toVacation: false })}
        text="Вы уверены отправить в отпуск преподавателя?"
        agreeCallback={onVacationTeacher}
      />

      <PromptWithCommentModal
        open={modal.fromVacation}
        handleClose={() => setModal({ ...modal, fromVacation: false })}
        text="Вы уверены вернуть из отпуска преподавателя?"
        agreeCallback={returnFromVacationTeacher}
      />
      <table className="info_table">
        <tbody>
          <tr>
            <td>ФИО</td>
            <td>{teacher.full_name ?? ""}</td>
          </tr>
          <tr>
            <td>ИНН</td>
            <td>{teacher.inn}</td>
          </tr>
          <tr>
            <td>Дата рождения</td>
            <td>{teacher.date_birth ?? "-"}</td>
          </tr>
          <tr>
            <td>Предмет</td>
            <td>{teacher.predmet}</td>
          </tr>
          <tr>
            <td>Адрес</td>
            <td>{teacher.address}</td>
          </tr>
          <tr>
            <td>Активность</td>
            <td>
              {teacher.is_active
                ? "Активен"
                : teacher.status === TeacherStatus.Fired
                ? "Уволен"
                : "В отпуске"}
            </td>
          </tr>
          <tr>
            <td>Стаж</td>
            <td>{teacher.staj || "-"}</td>
          </tr>
          <tr>
            <td>Номер телефона</td>
            <td>{teacher.phone}</td>
          </tr>
          <tr>
            <td>Доп.номера телефонов</td>
            <td>
              {teacher.phone_numbers
                ? teacher.phone_numbers.map((phone, index) => {
                    return <Typography key={index}>{phone.phone}</Typography>;
                  })
                : "-"}
            </td>
          </tr>
          <tr>
            <td>Образование</td>
            <td>
              {teacher.place_of_study
                ? teacher.place_of_study.map((place, index) => {
                    return (
                      <Typography key={index}>{place.mestoucheby}</Typography>
                    );
                  })
                : "-"}
            </td>
          </tr>
          <tr>
            <td>Места работы</td>
            <td>
              {teacher.place_of_works
                ? teacher.place_of_works.map((place, index) => {
                    return (
                      <Typography key={index}>{place.mestoraboty}</Typography>
                    );
                  })
                : "-"}
            </td>
          </tr>
          <tr>
            <td>Комментарии</td>
            <td>{teacher.comment ?? "-"}</td>
          </tr>
        </tbody>
      </table>
      <Stack spacing={2} direction="row" mt="16px">
        <Button
          variant="contained"
          color="error"
          onClick={() => setModal({ ...modal, fire: true })}
          disabled={
            !teacher.is_active && teacher.status === TeacherStatus.Fired
          }
        >
          Уволить
        </Button>
        <Button
          variant="contained"
          onClick={() => setModal({ ...modal, toVacation: true })}
          disabled={
            teacher.status === TeacherStatus.Fired ||
            teacher.status === TeacherStatus.Vacation
          }
        >
          Отправить в отпуск
        </Button>
        <Button
          variant="contained"
          onClick={() => setModal({ ...modal, fromVacation: true })}
          disabled={
            teacher.status === TeacherStatus.Fired ||
            teacher.status === TeacherStatus.Working
          }
        >
          Вернуть из отпуска
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => setModal({ ...modal, edit: true })}
        >
          Редактировать в профиль
        </Button>
      </Stack>
    </Box>
  );
};

export default Info;
