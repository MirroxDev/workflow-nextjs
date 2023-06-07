const DContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col flex-[0_1] h-full min-h-screen p-5">{children}</main>
  );
};

export default DContent;
