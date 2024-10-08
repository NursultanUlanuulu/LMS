import { ROUTES } from "./Routes";
import { Roles } from "@/shared/enums";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import Person4Icon from "@mui/icons-material/Person4";
import GroupsIcon from "@mui/icons-material/Groups";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";

const shared = [
  {
    text: "Главная",
    href: "/",
    roles: [Roles.Manager, Roles.SuperAdmin, Roles.Student, Roles.Teacher],
    icon: HomeIcon,
  },
];
const managerLinks = [
  {
    text: "Студенты",
    href: ROUTES.students + "/1",
    roles: [Roles.Manager],
    icon: PersonIcon,
  },
  {
    text: "Преподаватели",
    href: ROUTES.teachers + "/1",
    roles: [Roles.Manager],
    icon: Person4Icon,
  },
  {
    text: "Группы",
    href: ROUTES.groups + "/1",
    roles: [Roles.Manager],
    icon: GroupsIcon,
  },
  {
    text: "Посещения",
    href: ROUTES.attendances,
    roles: [Roles.Manager],
    icon: ReplyAllIcon,
  },
  {
    text: "Журнал",
    href: ROUTES.history,
    roles: [Roles.Manager],
    icon: FlagIcon
  },
  {
    text: "Книги",
    href: ROUTES.books,
    roles: [Roles.SuperAdmin],
    icon: MenuBookIcon,
  },
];
const superadminLinks = [
  {
    text: "Филиалы",
    href: ROUTES.branches,
    roles: [Roles.SuperAdmin],
    icon: AddBusinessIcon,
  },
  {
    text: "Менеджеры",
    href: ROUTES.managers,
    roles: [Roles.SuperAdmin],
    icon: PersonAddIcon,
  },
  {
    text: "Предметы",
    href: ROUTES.subjects,
    roles: [Roles.SuperAdmin],
    icon: BookmarkIcon,
  },
  {
    text: "Источники рекламы",
    href: ROUTES.promoters,
    roles: [Roles.SuperAdmin],
    icon: NotificationImportantIcon,
  },
  {
    text: "Дни недели",
    href: ROUTES.dayOfWeek,
    roles: [Roles.SuperAdmin],
    icon: CalendarMonthIcon,
  },
  {
    text: "Время",
    href: ROUTES.time,
    roles: [Roles.SuperAdmin],
    icon: AccessTimeIcon,
  },
];
const links = [...shared, ...managerLinks, ...superadminLinks];
export default links;
