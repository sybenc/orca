import { Button, ButtonGroup, Icon, Checkbox } from '@orca/ui'
import { Stack } from '@mui/material'

const LCDP = () => {
  return (
    <h2>
      <Stack gap={2} direction="row">
        <ButtonGroup>
          <Button variant="outlined" color="error">你好</Button>
          <Button variant="outlined" color="error">你好</Button>
          <Button variant="outlined" color="error">你好</Button>
        </ButtonGroup>
        <Button variant="outlined" color="error" endIcon={<Icon name="Home" />}>你好</Button>
      </Stack>
      <Checkbox
        icon={<Icon name="BookmarkBorder" />}
        checkedIcon={<Icon name="Bookmark" />} disableRipple/>
    </h2>
  )
}

export default LCDP
