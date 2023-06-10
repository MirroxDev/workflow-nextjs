import getResumeById from "@/app/actions/getResumeById";

interface IParams {
  slug?: string;
}

const SingleResume = async ({ params }: { params: IParams }) => {
  console.log(params)
  const resume = await getResumeById(params);
  return <div>{resume?.rank}</div>;
};

export default SingleResume;
