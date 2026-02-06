interface DividerProps {
  height?: number;
}

const Divider: React.FC<DividerProps> = ({ height = 16 }) => {
  return (
    <div
      style={{ height: `${height}px` }}
      className="border-l-[3px] border-black my-12"
    />
  );
};

export default Divider;
