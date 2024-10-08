import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, IconButton, Modal, Paper } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

const PromptModal = ({
  open,
  handleClose,
  text,
  agreeCallback,
}: {
  open: boolean
  handleClose: () => void
  text: string
  agreeCallback: () => void
}) => {
  return (
    <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "250px auto 10px auto",
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
        <Stack direction="row" spacing={2} sx={{ mt: "20px" }}>
          <Button sx={{ color: "#fff" }} onClick={handleClose}>
            Отмена
          </Button>
          <Button sx={{ color: "#fff" }} onClick={agreeCallback}>
            Да
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default PromptModal
