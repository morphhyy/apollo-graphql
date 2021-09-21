import { QUERY_ALL_USERS, QUERY_USER, QUERY_CREATE_USER, QUERY_DELETE_USER } from '../graphql/query.js'
import { useState } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { Formik, Form, Field } from 'formik'

const Home = () => {

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS)

  const [fetchUser, { data: userData }] = useLazyQuery(QUERY_USER)
  const [deleteUser , { data: deleteData }] = useMutation(QUERY_DELETE_USER)

  const [onSubmit, { data: createUser }] = useMutation(QUERY_CREATE_USER)

  const [id, setId] = useState("")

  if(loading) return <h1>loading...</h1>

    return (
        <div>
            {
                data && data.users.map(m => {
                    return (
                        <div key={m.id}>
                            <h1>{m.name}</h1>
                            <pre>{m.email}</pre>
                            <pre>{m.id}</pre>
                            <pre>{m.password}</pre>
                        </div>
                    )
                })
            }
            <input type="text" onChange={e => setId(e.target.value)} value={id}/>
            <br /><br />
            <button onClick={() => fetchUser({
                variables : {
                    userId: id
                  }
            })}>Click me</button>

            <div>
                { userData && <h1>{userData.user.name}</h1> }
            </div>

            <div>
                <Formik onSubmit={({name, email, password}, {resetForm}) => {
                    onSubmit({ variables : { 
                        createUserInput: { name, email, password }}
                    })
                    resetForm({ data: ''})
                    setTimeout(() => refetch(), 2000)
                }}
                initialValues={{
                    name:"", email:"", password:""
                    
                }}>
                    <Form>
                        <br />
                        <label>Name : </label>
                        <Field name="name" placeholder="Name"/>

                        <br /><br />
                        <label>Email : </label>
                        <Field name="email" placeholder="Text"/>

                        <br /><br />
                        <label>Password : </label>
                        <Field name="password" placeholder="password"/>
                        <br /><br />

                        <input type="submit" value="Create User" />
                    </Form>
                </Formik>
            </div>
            
            { createUser && console.log(createUser.createUser)}

            <div><br />
                <input type="text" placeholder="ID" onChange={e => setId(e.target.value)} value={id}/>
                <input type="submit" value="Delete User" onClick={() => { deleteUser({
                    variables : { userId : id }
                })
                setTimeout(() => refetch(), 2000)
                setId("")
                }}/>
            </div>
            { deleteData && console.log(deleteData) }
        </div>
        
    )
}

export default Home
