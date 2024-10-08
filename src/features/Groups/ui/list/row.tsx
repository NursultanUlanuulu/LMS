import { Button, Chip, Stack, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import { CommentModal } from "@/widgets";
import { Group } from "../../type";
import { useNavigate } from "react-router";
import { toastError } from "@/shared/libs";
import { useAppDispatch } from "@/app/store";
import { editGroup } from "../../store/actions";

const Row = ({ row, callback }: { row: Group; callback: () => void }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState({
    comment: false,
    edit: false,
  });
  const [comment, setComment] = useState(row.comment || "");
  const handleComment = (e: any) => {
    setComment(e.target.value);
  };
  const onClickModal = () => {
    if (!comment) {
      toastError("Напишите комментарий");
    } else {
      dispatch(editGroup({ req: { comment }, id: row.id }));
      setModal({ ...modal, comment: false });
    }
  };
  return (
    <TableRow
      sx={{
        cursor: "pointer",
        transition: "all 0.4s ease",
        "&:hover": {
          opacity: 0.7,
        },
      }}
      key={row.id}
    >
      <CommentModal
        comment={comment}
        onClickModal={onClickModal}
        handleComment={handleComment}
        open={modal.comment}
        handleClose={() => {
          setModal({ ...modal, comment: false });
        }}
      />
      <TableCell onClick={callback}>{row.subject}</TableCell>

      <TableCell onClick={callback}>{row.name}</TableCell>

      <TableCell onClick={callback}>
        {row.day_of_the_week
          .map((day) => {
            return day.week_day;
          })
          .join(" - ")}
      </TableCell>
      <TableCell onClick={callback}>{row.time}</TableCell>
      <TableCell
        onClick={() => {
          navigate("/teachers/details/" + row.current_teacher_id);
        }}
      >
        {row.current_teacher_name}
      </TableCell>
      <TableCell onClick={callback}>
        {row.exists_students}/{row.max_student_count}
      </TableCell>

      {/* status */}
      {/* <TableCell onClick={callback}>
        <Chip
          color={!row.archived ? "success" : "secondary"}
          label={row.archived ? "Архивирована" : "Активная"}
        />
      </TableCell> */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        {!row.archived ? (
          <Stack
            spacing={2}
            direction={{
              xl: "row",
              lg: "column",
              md: "column",
              sm: "column",
              xs: "column",
            }}
            flexWrap="wrap"
          >
            <Button
              onClick={(e) => {
                navigate("/groups/edit/" + row.id);
              }}
              color="success"
              variant="contained"
            >
              <EditIcon sx={{ color: "#fff" }} />
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={(e) => {
                setModal({ ...modal, comment: true });
              }}
            >
              <CommentIcon sx={{ color: "#fff" }} />
            </Button>
          </Stack>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default Row;
