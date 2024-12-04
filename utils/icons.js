import { memo } from 'react';
import { PiEyeLight } from 'react-icons/pi';

const MemoizedPiEyeLight = memo(() => <PiEyeLight size={26} />);
export default MemoizedPiEyeLight;
