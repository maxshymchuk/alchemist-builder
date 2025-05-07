import {
  handleAdd,
  handleContextMenu,
  handleDebugHeader,
  handleInit,
  handleMouseUp,
  handleAdd10Records,
} from './handlers';
import { DOMS } from './constants';

DOMS.Window?.addEventListener('load', handleInit);

DOMS.Main?.addEventListener('contextmenu', handleContextMenu);
DOMS.Main?.addEventListener('mouseup', handleMouseUp);

DOMS.ButtonAdd?.addEventListener('click', handleAdd);

DOMS.DebugToggle?.addEventListener('click', handleDebugHeader);
DOMS.DebugAdd10Records?.addEventListener('click', handleAdd10Records);
