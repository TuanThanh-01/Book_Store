const Rating = ({ rating }) => {
  const star = +rating.star;

  return (
    <div className='p-3 border mb-3'>
      <p className='font-weight-bold'>{rating.userNameRating}</p>
      <hr />
      <p>{rating.message}</p>
      <div>
        {[...Array(5).keys()].map((current) =>
          current <= star - 1 ? (
            <span className='fa fa-star checked ml-1'></span>
          ) : (
            <span className='fa fa-star ml-1'></span>
          )
        )}
      </div>
    </div>
  );
};

export default Rating;
