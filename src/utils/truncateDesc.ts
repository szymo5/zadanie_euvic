export const truncateDesc =  (description:string) => description.length > 10 ? `${description.substring(0, 10)} ...` : description;