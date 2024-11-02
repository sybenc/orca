import { Button, ButtonGroup, Icon, Checkbox, ToggleButton, ToggleButtonGroup, Stack, Box } from '@orca/ui'
import { Canvas, Drag, XRuler, YRuler } from '@cat/canvas'
import { Queue } from '@squirrel/queue'

const LCDP = () => {
  const queue = new Queue<number>()
  queue.enqueue(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  return (
    <div>
      {/*<Stack gap={2} direction="row">*/}
      {/*  <ButtonGroup>*/}
      {/*    <Button variant="contained" color="error" onClick={() => message('你好', 'info')}>你好</Button>*/}
      {/*    <Button variant="contained" color="error" onClick={() => message('你好', 'error')}>你好</Button>*/}
      {/*    <Button variant="outlined" color="error" onClick={() => dialog({*/}
      {/*      title: '你好',*/}
      {/*      content: '人生若只如初见，何事秋风悲画扇',*/}
      {/*      actions: <Button variant="contained" color="primary">确定</Button>*/}
      {/*    })}>你好</Button>*/}
      {/*  </ButtonGroup>*/}
      {/*  <Button variant="contained" color="error" endIcon={<Icon name="Home" />}>你好</Button>*/}
      {/*</Stack>*/}
      {/*<Checkbox*/}
      {/*  icon={<Icon name="BookmarkBorder" />}*/}
      {/*  checkedIcon={<Icon name="Bookmark" />} disableRipple />*/}
      {/*<ToggleButtonGroup size="small">*/}
      {/*  <ToggleButton value="left">*/}
      {/*    <Icon name="FormatAlignLeft" fontSize="small" />*/}
      {/*  </ToggleButton>*/}
      {/*  <ToggleButton value="center">*/}
      {/*    <Icon name="FormatAlignCenter" fontSize="small" />*/}
      {/*  </ToggleButton>*/}
      {/*  <ToggleButton value="right">*/}
      {/*    <Icon name="FormatAlignRight" fontSize="small" />*/}
      {/*  </ToggleButton>*/}
      {/*</ToggleButtonGroup>*/}
      {/*<ToggleButtonGroup size="medium">*/}
      {/*  <ToggleButton value="left">*/}
      {/*    <Icon name="FormatAlignLeft" />*/}
      {/*  </ToggleButton>*/}
      {/*  <ToggleButton value="center">*/}
      {/*    <Icon name="FormatAlignCenter" />*/}
      {/*  </ToggleButton>*/}
      {/*  <ToggleButton value="right">*/}
      {/*    <Icon name="FormatAlignRight" />*/}
      {/*  </ToggleButton>*/}
      {/*</ToggleButtonGroup>*/}
      {/*<Drag.Source data={'ToggleButtonGroup'} sendKey={'id'}>*/}
      {/*  <ToggleButtonGroup>*/}
      {/*    <ToggleButton value="left" size="large">*/}
      {/*      <Icon name="FormatAlignLeft" fontSize="large" />*/}
      {/*    </ToggleButton>*/}
      {/*    <ToggleButton value="center" size="large">*/}
      {/*      <Icon name="FormatAlignCenter" fontSize="large" />*/}
      {/*    </ToggleButton>*/}
      {/*    <ToggleButton value="right" size="large">*/}
      {/*      <Icon name="FormatAlignRight" fontSize="large" />*/}
      {/*    </ToggleButton>*/}
      {/*  </ToggleButtonGroup>*/}
      {/*</Drag.Source>*/}
      <Drag.Source data={queue.toString()} sendKey={'id'}>
        <Button>你好</Button>
      </Drag.Source>
      <Box position="relative">
        <XRuler position="absolute" width={1200} labelSuffix="%" />
        <YRuler position="absolute" top={0} left={0} height={600} />
        <Drag.Target
          position="absolute"
          top="18px"
          left="18px"
          acceptKey={'id'}
          onDropEnd={(data, position) => console.log(data, position)}>
          <Canvas.Grid width={1200} height={600} spacingX={1200 / 24}
                       spacingY={10} />
        </Drag.Target>
        {/*<DotCanvas position="absolute" top="16px" left="16px" width={1200} height={400} spacingX={20} spacingY={20}*/}
        {/*           radius={1.5} />*/}
      </Box>
    </div>
  )
}

export default LCDP
