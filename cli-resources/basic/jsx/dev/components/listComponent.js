import {h} from '../src/utils/h'

export const listComponent = new Component({
  element: "#list",
  render: (data) => (
    <li>
      <h3>{ data }</h3>
    </li>
  )
})
