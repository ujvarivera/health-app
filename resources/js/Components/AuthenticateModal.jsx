import Modal from '@/Components/Modal';
import AuthenticateText from './AuthenticateText';

export default function AuthenticateModal({ showUnauthenticatedMessage, setShowUnauthenticatedMessage }) {

    return (
        <Modal show={showUnauthenticatedMessage} onClose={() => setShowUnauthenticatedMessage(false)}>
            <div className='m-4'>
                <h2 className="text-2xl font-medium text-red-500">
                    Unauthenticated.
                </h2>

                <AuthenticateText>You need to be logged in to like the recipes.</AuthenticateText>
            </div>
        </Modal>
    )
}