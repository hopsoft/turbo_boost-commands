import { invoke } from '../invoker'

const invokeCommand = (_, payload = {}) => invoke(payload)

export default { invokeCommand }
