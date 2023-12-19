const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

// Importujte váš socket server
const { server } = require('../socket');

describe('Socket Server', () => {
    it('should handle connection event with expected parameters', (done) => {
        // Vytvorte mock funkciu pre io.on('connection', ...)
        const onConnectionMock = sinon.stub(server._io, 'on');

        // Vytvorte socket objekt
        const socket = {
            id: 'mockedSocketId',
            join: sinon.stub(),
            on: sinon.stub(),
        };

        // Simulujte udalosť 'connection'
        onConnectionMock.callArgWith(1, socket);

        // Overte, že mock funkcia bola volaná s očakávanými parametrami
        expect(onConnectionMock.calledWith('connection')).to.be.true;

        // Overte, že join bola volaná s očakávanými parametrami
        expect(socket.join.calledWith('mockedRoomId')).to.be.true;

        // Obnovte mock funkciu
        onConnectionMock.restore();

        // Označte test ako dokončený
        done();
    });
});
