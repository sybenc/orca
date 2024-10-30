import { Button, ButtonGroup, Icon, Checkbox, ToggleButton, ToggleButtonGroup } from '@orca/ui'
import { Stack } from '@mui/material'
import { Ruler } from '@orca-lcdp/canvas'

const LCDP = () => {
  return (
    <div>
      <Stack gap={2} direction="row">
        <ButtonGroup>
          <Button variant="contained" color="error">你好</Button>
          <Button variant="outlined" color="error">你好</Button>
          <Button variant="outlined" color="error">你好</Button>
        </ButtonGroup>
        <Button variant="contained" color="error" endIcon={<Icon name="Home" />}>你好</Button>
      </Stack>
      <Checkbox
        icon={<Icon name="BookmarkBorder" />}
        checkedIcon={<Icon name="Bookmark" />} disableRipple />
      <ToggleButtonGroup size="small">
        <ToggleButton value="left">
          <Icon name="FormatAlignLeft" fontSize="small" />
        </ToggleButton>
        <ToggleButton value="center">
          <Icon name="FormatAlignCenter" fontSize="small" />
        </ToggleButton>
        <ToggleButton value="right">
          <Icon name="FormatAlignRight" fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup size="medium">
        <ToggleButton value="left">
          <Icon name="FormatAlignLeft" />
        </ToggleButton>
        <ToggleButton value="center">
          <Icon name="FormatAlignCenter" />
        </ToggleButton>
        <ToggleButton value="right">
          <Icon name="FormatAlignRight" />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup>
        <ToggleButton value="left" size="large">
          <Icon name="FormatAlignLeft" fontSize="large" />
        </ToggleButton>
        <ToggleButton value="center" size="large">
          <Icon name="FormatAlignCenter" fontSize="large" />
        </ToggleButton>
        <ToggleButton value="right" size="large">
          <Icon name="FormatAlignRight" fontSize="large" />
        </ToggleButton>
      </ToggleButtonGroup>
      <Ruler></Ruler>
    </div>

  )
}

export default LCDP
