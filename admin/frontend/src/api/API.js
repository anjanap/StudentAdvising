const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//signUp
export const signup = (payload) =>
    fetch(`${api}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res.status;
        })
        .catch(error => {
            console.log("This is signup error");
            return error;
        });


//signIn
export const signin = (payload) =>
    fetch(`${api}/signIn`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is login error");
            return error;
        });


//get all questions
export const getAllQuestions = (payload) =>
    fetch(`${api}/getAllQuestionsAndAnswers`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is getAllQuestionsAndAnswers error");
            return error;
        });


//get all categories
export const getAllCategories = (payload) =>
    fetch(`${api}/getAllCategories`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is getAllCategories error");
            return error;
        });


//add new question
export const setQuestionAndAnswer = (payload) =>
    fetch(`${api}/setQuestionAndAnswer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is setQuestionAndAnswer error");
            return error;
        });


//delete question and answer
export const deleteQuestionAndAnswer = (payload) =>
    fetch(`${api}/deleteQuestionAndAnswer`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is deleteQuestionAndAnswer error");
            return error;
        });

// edit question details
export const editQuestionAndAnswer = (payload) =>
    fetch(`${api}/editQuestionAndAnswer`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is editQuestionAndAnswer error");
            return error;
        });


//add new category
export const setCategory = (payload) =>
    fetch(`${api}/setCategory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is setCategory error");
            return error;
        });


// //get all unanswered
export const getAllUnansweredQuestions = (payload) =>
    fetch(`${api}/getAllUnansweredQuestions`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is getAllCategories error");
            return error;
        });


//delete question and answer
export const deleteUnansweredQuestion = (payload) =>
    fetch(`${api}/deleteUnansweredQuestion`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is deleteQuestionAndAnswer error");
            return error;
        });


//get inactive users
export const getAllInactiveUsers = () =>
    fetch(`${api}/getAllInactiveUsers`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is approveUser error");
            return error;
        });

//approve user
export const approveUser = (payload) =>
    fetch(`${api}/approveUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is approveUser error");
            return error;
        });



export const getAllMatchingQuestions = (payload) =>
    fetch(`${api}/getAllMatchingQuestions`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is getAllMatchingQuestions error");
            return error;
        });

