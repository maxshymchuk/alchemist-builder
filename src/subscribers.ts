import {
  handleAdd,
  handleContextMenu,
  handleDebugHeader,
  handleInit,
  handleMouseUp,
  handleAddRecords,
} from './handlers';
import { DOMS } from './constants';

DOMS.Window?.addEventListener('load', handleInit);

DOMS.Main?.addEventListener('contextmenu', handleContextMenu);
DOMS.Main?.addEventListener('mouseup', handleMouseUp);

DOMS.ButtonAdd?.addEventListener('click', handleAdd);

DOMS.DebugToggle?.addEventListener('click', handleDebugHeader);
DOMS.DebugAdd1Record?.addEventListener('click', handleAddRecords(1));
DOMS.DebugAdd100Records?.addEventListener('click', handleAddRecords(100));
