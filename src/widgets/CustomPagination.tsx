import {
  Stack,
  Pagination,
  FormControl,
  OutlinedInput,
  Box,
} from "@mui/material"
import { useState, useEffect, ChangeEvent, MouseEvent } from "react"
const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])
  return width <= 768
}

interface Props {
  handleChangePage: (event: React.ChangeEvent<any>, page: number) => void
  defaultPage: number
  totalCount: number
  currentPage: number
  limit: number
  pagesCount: number
}

/**Переиспользуемая пагинационная панель*/
const CustomPagination = ({
  handleChangePage,
  defaultPage,
  currentPage,
  pagesCount,
}: Props) => {
  const [search, setSearch] = useState<string>(currentPage.toString())
  const isMobile = useCheckMobileScreen()
  const boundaryCount = isMobile ? 3 : 6
  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    if (parseInt(search) > pagesCount || parseInt(search) < 1) {
      return
    }
    handleChangePage(e, parseInt(search))
  }
  useEffect(() => {
    setSearch(currentPage.toString())
  }, [currentPage])
  if (pagesCount <= 1) return null
  return (
    <Box sx={{ mt: "10px" }}>
      <Stack direction="row" spacing={2}>
        <Pagination
          count={pagesCount}
          page={currentPage}
          onChange={handleChangePage}
          boundaryCount={boundaryCount}
          defaultPage={defaultPage}
          variant="outlined"
          shape="rounded"
        />
        <Box>
          <FormControl
            sx={{
              width: "60px",
            }}
            error={parseInt(search) > pagesCount || parseInt(search) < 1}
            variant="outlined"
          >
            <OutlinedInput
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              onKeyUp={event => {
                if (event.key === "Enter") handleSubmit(event as any)
              }}
              type="number"
              inputProps={{
                style: {
                  padding: "6px",
                  height: "100%",
                },
              }}
              endAdornment={
                <i
                  onClick={handleSubmit}
                  className="fa-solid fa-magnifying-glass touchable_icon"
                />
              }
            />
          </FormControl>
        </Box>
      </Stack>
    </Box>
  )
}
export default CustomPagination
