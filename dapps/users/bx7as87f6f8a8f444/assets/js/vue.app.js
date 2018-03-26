;(function () {

    'use strict';

    new Vue({
        el: '#app',
        data: {
            target: null,
            rooms: {
                '12e11241f122f12g1': {
                    name: 'Room Name 1',
                    time: '12:09',
                    image: 'assets/images/avatar/1.jpg',
                    lastmsg: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.',
                    messages: [
                        {
                            from: true,
                            username: 'test',
                            content: 'Cras sit amet nibh libero, in gravida nulla.'
                        },{
                            from: false,
                            username: 'test',
                            content: 'Cras sit amet nibh libero, in gravida nulla.'
                        }
                    ]
                },
                '52e11241f122f12g2': {
                    name: 'Room Name 2',
                    time: '15:30',
                    image: 'assets/images/avatar/2.jpg',
                    lastmsg: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.',
                    messages: [
                        {
                            from: false,
                            username: 'test',
                            content: 'Cras sit amet nibh libero, in gravida nulla.'
                        },{
                            from: true,
                            username: 'test',
                            content: 'Cras sit amet nibh libero, in gravida nulla.'
                        }
                    ]
                } 
            }
        }
    })

})();