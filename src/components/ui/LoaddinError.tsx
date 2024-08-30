
const LoaddinError = () => {
    return (
        <>
            if (isLoading) return <p>Loading...</p>;
            if (isError) return <p>Something went wrong. Please try again later.</p>;
        </>
    );
};

export default LoaddinError;