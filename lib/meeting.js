const bindMethods = require('./bind-methods');
const meetings = [];

exports.Meeting = class Meeting {
    constructor(socket, global) {
        this.global = global;
        this.socket = socket;
        bindMethods(Meeting, this, socket);
    }

    onRequestMeetings() {
        console.log('Meetings requested');
        this.emitMeetings();
    }

    onUpdateMeeting(updatedMeeting) {
        const index = meetings.findIndex(m => m.title === updatedMeeting.title);

        if (index !== -1) {
            console.log('update meeting', updatedMeeting.title);
            meetings[index] = updatedMeeting;
        }
    }

    onNewMeeting(meeting) {
        console.log('new meeting', meeting.title);
        meetings.push(meeting);
        this.emitMeeting(meeting);
    }

    emitMeeting(meeting) {
        this.socket.emit('meeting', meeting);
    }

    emitMeetings() {
        this.socket.emit('meetings', meetings);
    }

};
