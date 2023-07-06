import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isStarBtn: false}

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onDateChange = e => {
    this.setState({date: e.target.value})
  }

  onFormSubmitted = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {id: uuidv4(), title, date, isStared: false}
    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilterData = () => {
    const {appointmentsList, isStarBtn} = this.state
    console.log(appointmentsList)
    if (isStarBtn) {
      return appointmentsList.filter(each => each.isStared === true)
    }
    return appointmentsList
  }

  isStaredBtnClicked = () => {
    this.setState(preState => ({
      isStarBtn: !preState.isStarBtn,
    }))
  }

  staredAppointment = id => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  render() {
    const {title, date} = this.state
    const filteredData = this.getFilterData()

    return (
      <div className="app-container">
        <div className="card">
          <div className="top-section">
            <div className="input-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.onFormSubmitted}>
                <div className="title-input-container">
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <br />
                  <input
                    id="title"
                    type="text"
                    className="input"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="title-input-container">
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <br />
                  <input
                    id="date"
                    type="date"
                    className="input"
                    value={date}
                    onChange={this.onDateChange}
                  />
                </div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-heading-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className="start-btn"
              onClick={this.isStaredBtnClicked}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredData.map(each => (
              <AppointmentItem
                appointment={each}
                key={each.id}
                staredAppointment={this.staredAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
