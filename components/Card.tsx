export default function Card({ title, description }: { title: string; description: string; }) {
  return (
    <div className='bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition'>
      <h2 className='text-xl font-semibold mb-2'>{title}</h2>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}