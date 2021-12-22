import './App.css';
import React, {useState} from 'react'

const initialValues = {
    userName: "",
    userSurname: "",
    userSalary: "",
}

function App() {
    const [userData, setUserData] = useState(initialValues)
    const [users, setUsers] = useState([])
    const [editableUserData, setEditableUserData] = useState({
        isEdit: false,
        userIndex: null
    })

    const handleRemoveClick = (index) => {
        setUsers(users.filter((user, userIndex) => userIndex !== index ))
    }

    const isFilledFields = userData.userName && userData.userSurname && userData.userSalary;

    const handleSubmiteUser = (e) => {
        e.preventDefault()

        if (isFilledFields) {
            if (editableUserData.isEdit){
                const editedDate = users;
                editedDate.splice(editableUserData.userIndex, 1, userData)

                setUserData(initialValues)

                setEditableUserData({
                    isEdit: false,
                    userIndex: null
                })
            }else {
                setUsers((prevState) => [...prevState, userData])
            }

            setUserData(initialValues)
        }
    }

    const handleCleaneClick = () => setUserData(initialValues)
    console.log(users, 'users')

    const handleEditeClick = (data, index) => {
        setUserData(data);
        setEditableUserData({
            isEdit: true,
            userIndex: index
        })
    }

    return (
        <div className="wrapper">
            <div className="wrapper-content">
                <div className="table-data">
                    <table>
                        <th>#</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Salary</th>
                        <th>Actions</th>

                        <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.userName}</td>
                                <td>{user.userSurname}</td>
                                <td>{user.userSalary}</td>
                                <td>
                                    <button className='edit-action' onClick={() => handleEditeClick(user, index)}>edit</button>
                                    <button className='remove-action' onClick={() => handleRemoveClick(index)}> remove</button>
                                </td>
                            </tr>

                            )
                        )}



                        </tbody>
                    </table>
                </div>

                <div>
                    <form onSubmit={(e) => handleSubmiteUser(e)} onReset={handleCleaneClick}>
                        <input placeholder='Write your name'
                               onChange={(e) => setUserData((prevState) => ({
                                   ...prevState,
                                   userName: e.target.value,
                               }))}
                               value={userData.userName}
                        />
                        <input placeholder='Write your surname'
                               onChange={(e) => setUserData((prevState) => ({
                                   ...prevState,
                                   userSurname: e.target.value
                               }))}
                               value={userData.userSurname}/>
                        <input placeholder='Write your salary'
                               onChange={(e) => setUserData((prevState) => ({
                                       ...prevState,
                                       userSalary: e.target.value
                                   })
                               )}
                               value={userData.userSalary}/>

                        <div className='buttons-wrapper'>
                            <button type='reset'>Clear</button>
                            <button disabled={!isFilledFields} type='submit'>{editableUserData.isEdit ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
