import {h} from '../src/utils/h'

export const chosenPersonComponent = new Component({
  element: "#chosenPersonList",
  render: (data) => (
    <li>
      <div>
        <h3>First Name: { data.firstName }</h3>
        <h4>Last Name: { data.lastName }</h4>
      </div>
    </li>
  )
})
