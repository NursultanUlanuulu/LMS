import { Button, Box, Stack } from "@mui/material"
import { Header } from "@/widgets"
import { Formik, useFormik } from "formik"
import * as yup from "yup"
import { useAppSelector } from "@/app/store"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { selectAddStudentToGroupStatus } from "@/features/Students/store/selector"
import { StatusResponse } from "@/shared/enums"
import { MyInput, MySelect } from "@/shared/ui"
import { Group } from "@/features/Groups/type"
import { useEffect } from "react"

const ChangePriceModal = ({
  callback,
  activeGroup,
  title = "Цена по которой студент будет обучаться",
  label = "Укажите цену",
}: {
  callback: (sum: number, tarif_type: string) => void
  activeGroup: Group
  title?: string
  label?: string
}) => {
  const isAddToGroupLoading =
    useAppSelector(selectAddStudentToGroupStatus) === StatusResponse.LOADING
  const initialValues: {
    sum: string
    type: "Pourochnaya" | "Optom" | "Unikalnaya"
  } = {
    sum: "",
    type: "Optom",
  }
  const validationSchema = yup.object().shape({
    sum: yup.number().required("Обязательное поле"),
  })

  const onSubmit = (values: { sum: string; type: string }) => {
    if (values.sum) {
      callback(Number(values.sum), values.type)
    }
  }
  const formik = useFormik({
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    initialValues: initialValues,
  })
  useEffect(() => {
    if (formik.values.type === "Pourochnaya") {
      formik.setFieldValue(
        "sum",
        Number(activeGroup.pourochno_price) *
          Number(activeGroup.number_of_lessons)
      )
    } else {
      formik.setFieldValue("sum", "")
    }
  }, [formik.values.type])
  return (
    <Box>
      <Header title={title} />
      <Box sx={{ maxWidth: "600px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={2}>
            <MySelect
              showNothing={false}
              name="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={"Optom"}
              items={[
                { text: "Оптовая", value: "Optom" },
                { text: "Поурочная", value: "Pourochnaya" },
                { text: "Уникальная", value: "Unikalnaya" },
              ]}
            />
            {formik.values.type === "Optom" ||
            formik.values.type === "Unikalnaya" ? (
              <MyInput
                name="sum"
                type="number"
                value={formik.values.sum}
                labelName={label}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.errors.sum}
                error={formik.touched.sum && Boolean(formik.errors.sum)}
              />
            ) : null}

            <Button
              sx={{ background: tokensDark.greenAccent[500] }}
              variant="contained"
              type="submit"
              disabled={isAddToGroupLoading}
            >
              Отправить
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default ChangePriceModal
