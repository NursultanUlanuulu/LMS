import { selectSubjects } from './../../../Subjects/store/selector';
import { useAppSelector } from '@/app/store';
import { getSubjectsList } from './../../../Subjects/store/actions';
import { useEffect } from 'react';
import { TeacherCreate } from './../../type';
import { validator } from "@/shared/libs"
import * as yup from "yup"
import { useAppDispatch } from '@/app/store';
import { createTeacher } from '../../store/actions';

const createService = (onClose: () => void) => {
    const dispatch = useAppDispatch()
    const { data: subjects } = useAppSelector(selectSubjects)
    const validationSchema = yup.object().shape({
        full_name: yup.string().required("Обязательное поле"),
        date_birth: yup.string().required("Обязательное поле"),
        address: yup.string().required("Обязательное поле"),
        predmet: yup.string().required("Обязательное поле"),
        phone: yup.string().required("Обязательное поле").test("Неправильный формат номера телефона.", "Неправильный формат номера телефона.", (value) => validator.phoneWithout996Checker(value)),
        work_list: yup.array().of(
            yup.object().shape({
                place_of_work: yup.string().required("Обязательное поле")
            })
        ),
        education_list: yup.array().of(
            yup.object().shape({
                place_of_study: yup.string().required("Обязательное поле")
            })
        ),
        inn: yup
            .string()
            .required("Обязательное поле")
            .test("Неправильный формат ИНН", "Неправильный формат ИНН", (value) =>
                validator.innChecker(value)
            ),
    })

    const initialValues: TeacherCreate = {
        full_name: "",
        is_active: true,
        inn: "",
        address: "",
        comment: "",
        date_birth: '',
        predmet: '',
        education_list: [{ place_of_study: "" }],
        work_list: [{ place_of_work: "" }],
        staj: "",
        phone: '',
        optional_phone_list: [],
        user_type: 3
    }
    const onSubmit = (values: TeacherCreate) => {
        dispatch(createTeacher({ req: values, onClose }))
    }
    useEffect(() => {
        dispatch(getSubjectsList())
    }, [])
    return { initialValues, validationSchema, onSubmit, subjects }
}

export default createService
