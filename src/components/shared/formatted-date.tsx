
interface FormattedDateProps {
  date: string;
}

export const FormattedDate = ({ date }: FormattedDateProps) => {
    function handleTimeDifference(dateCreated: string) {
    let currentDate = Date.now();
    let postCreated = new Date(dateCreated).getTime();
    let seconds = (currentDate - postCreated) / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30.42;
    const years = months / 12;

    if(years > 1) {
      return Math.floor(years) + "y ago";
    } else if(months > 1) {
      return Math.floor(months) + "M ago";
    } else if(days > 1) {
      return Math.floor(days) + "d ago";
    } else if(hours > 1) {
      return Math.floor(hours) + "h ago";
    } else if(minutes > 1) {
      return Math.floor(minutes) + "m ago";
    } 
    return "<1m ago";
  }

  return (
    <div>
      { handleTimeDifference(date) }
    </div>
  )
}
