interface CustomMessageProps {
    children: React.ReactNode;
}

const CustomMessage: React.FC<CustomMessageProps> = ({ children }) => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            {children}
        </div>
    );
}

export default CustomMessage;
