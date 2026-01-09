interface DividerProps {
  height?: number;
}

const Divider: React.FC<DividerProps> = ({ height = 16 }) => {
  return (
    <div
      style={{ height: `${height}px` }}
      className="border-l-2 border-black my-12"
    />
  );
};

export default Divider;
