import {
  handleAdd,
  handleContextMenu,
  handleInit,
  handleMouseUp,
  handleAddRecords,
} from './handlers';
import { DOMS } from './constants';

DOMS.Window?.addEventListener('load', handleInit);

DOMS.Main?.addEventListener('contextmenu', handleContextMenu);
DOMS.Main?.addEventListener('mouseup', handleMouseUp);

DOMS.ButtonAdd?.addEventListener('click', handleAdd);

DOMS.DebugAddRecords?.forEach((button) => {
  const amount = Number(button.dataset.amount) || 0;
  button.value = `Add ${amount} record${amount > 1 ? 's' : ''}`;
  button.addEventListener('click', handleAddRecords(amount));
});
