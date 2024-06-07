import CodeGeneratorPage from '@/src/components/widgets/CodeGeneratorPage/CodeGeneratorPage';
import Header from '@/src/components/widgets/Header';

export default function Page() {
  return (
    <>
      <div className="mx-0 my-0 md:mx-12 lg:mx-16 md:my-6 lg:my-10 h-vh">
        <Header />
        <CodeGeneratorPage />
      </div>
    </>
  );
}
