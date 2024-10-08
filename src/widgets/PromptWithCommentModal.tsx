import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, Modal, Paper } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { MyTextArea } from "@/shared/ui"

const PromptWithCommentModal = ({
  open,
  handleClose,
  text,
  agreeCallback,
  defaultComment = "",
  shouldCloseModalAfterAction = true,
}: {
  open: boolean
  handleClose: () => void
  text: string
  agreeCallback: (text?: string) => void
  defaultComment?: string
  shouldCloseModalAfterAction?: boolean
}) => {
  const [message, setMessage] = useState(defaultComment)
  return (
    <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "200px auto 10px auto",
          background: tokensDark.primary[500],
          padding: "20px",
          "@media(max-width:640px)": {
            maxWidth: "95%",
          },
        }}
        component={Paper}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
          {text}
        </Typography>
        <MyTextArea
          value={message}
          placeholder="Комментарий"
          name="message"
          onBlur={() => {}}
          labelName=""
          onChange={(e: any) => setMessage(e.target.value)}
        />
        <Stack direction="row" spacing={2} sx={{ mt: "20px" }}>
          <Button sx={{ color: "#fff" }} onClick={handleClose}>
            Отмена
          </Button>
          <Button
            sx={{ color: "#fff" }}
            onClick={() => {
              agreeCallback(message)

              shouldCloseModalAfterAction && handleClose()
            }}
          >
            Да
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default PromptWithCommentModal
