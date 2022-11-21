

const ModelConversation = require('../models/conversationModel')
const ModelMessages = require('../models/messageModel')

const messageCtrl = {
    createMessage: async (req, res) => {
        try {
            const {text, recipient, media } = req.body

            if(!recipient || (!text.trim() && media.length === 0)) return;

            const new_conversation = await ModelConversation.findOneAndUpdate({
                    $or: [
                        {recipients: [req.user._id, recipient]},
                        {recipients: [recipient, req.user._id]}
                    ]
                }, {
                recipients: [req.user._id, recipient],
                    text, media
                }, { new: true,upsert: true })

            const new_message = new ModelMessages({
                conversation: new_conversation._id,
                sender: req.user._id,
                recipient, text, media
            })

            await new_message.save()

            res.json({msg: 'Create message success !'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = messageCtrl