export default function HeaderTitle({ title, className }: { title: string; className?: string }) {
    return <h2 className={'text-2xl font-medium text-[#F1F1F1]' + className}>{title}</h2>;
}
