module.exports = {

    getNotes: (req, res) => {
        console.log('called query for get notes');
        console.log(req.session.userId , req.session.loggedin);
        
    },

    createNotes: (req, res) => {
        console.log('called query for create notes');
    }
};