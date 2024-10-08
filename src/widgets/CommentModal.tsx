import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, IconButton, Modal, Paper } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import { MyTextArea } from "@/shared/ui"
import Button from "@mui/material/Button"

const CommentModal = ({
  open,
  handleClose,
  comment,
  handleComment,
  onClickModal,
}: {
  open: boolean
  handleClose: () => void
  comment: string
  handleComment: (e: any) => void
  onClickModal: () => void
}) => {
  return (
    <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "250px auto 10px auto",
          background: tokensDark.primary[500],
          position: "relative",
          padding: "20px",
          "@media(max-width:640px)": {
            maxWidth: "95%",
          },
        }}
        component={Paper}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
        <Typography>Добавить комментарий</Typography>
        <Box>
          <MyTextArea
            value={comment}
            onChange={handleComment}
            name="comment"
            onBlur={() => {}}
            labelName=""
          />
          <Button
            onClick={onClickModal}
            sx={{ mt: "20px" }}
            fullWidth
            variant="contained"
          >
            Отправить
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CommentModal
