
import { Card, CardHeader, CardFooter, CardContent } from './Card';

const NotificationCard = () => {
    const notifications = [
        {
            title: 'Your call has been confirmed.',
            description: '1 hour ago',
        },
        {
            title: 'You have a new message!',
            description: '1 hour ago',
        },
        {
            title: 'Your subscription is expiring soon!',
            description: '2 hours ago',
        },
    ];
    return (
        <Card>
            <CardHeader>
                <h2 className='text-lg font-semibold mb-1 dark:text-white'>Notifications</h2>
                <p className='text-sm text-gray-500 dark:text-gray-100'>You have {notifications.length} unread messages.</p>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <div>
                        {notifications.map((notification, index) => (
                            <div key={index} className='mb-4 flex items-start'>
                                <div className='h-2 w-2 bg-blue-500 mr-2 rounded-full mt-1'></div>
                                <div className="space-y-1">
                                    <p className='text-sm font-medium leading-none'>{notification.title}</p>
                                    <p className='text-sm text-gray-500'>{notification.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <button className='w-full bg-blue-500 text-white rounded-md py-2'>Mark all as read</button>
            </CardFooter>
        </Card>
    );
};

NotificationCard.propTypes = {};

export default NotificationCard;
