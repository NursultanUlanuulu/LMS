import { useAppSelector } from "@/app/store"
import { selectUserRole } from "@/features/Auth/store/selectors"
import { ErrorPage } from "@/widgets"

/**
 *Мидлвейр-роут для защищенных роутов
 *@children элемент, который нужно обвернуть
 *@roles массив, с ролями для определенных юзеров
 */
const  RequiredAuth = ({
  children,
  roles,
}: {
  children: React.ReactNode
  roles: number[]
}) => {
  const token: string | null = window.localStorage.getItem("token")
  const role = useAppSelector(selectUserRole)
  const userHasRequiredRole = roles.includes(role)
  if (token && role && !userHasRequiredRole) return <ErrorPage type={403} />
  else return children as JSX.Element
}
export default RequiredAuth
