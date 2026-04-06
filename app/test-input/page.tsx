// Демостраница, показывающая, как переиспользовать Input с инлайн-иконками и стек-обёрткой.
// Скопируйте эти примеры в любую страницу и подставьте нужные пропсы/иконки.
import { Input } from "@/components/UI/input/input";
import styles from "@/components/UI/input/input.module.css";
import pageStyles from "./page.module.css";

const Icon = ({ id, className }: { id: string; className?: string }) => {
  const merged = `${styles.icon} ${className ?? ""}`.trim();
  return (
    <svg className={merged} aria-hidden width={20} height={20}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

// Простой вертикальный стек с настраиваемыми gap/padding.
const Stack = ({
  gap = 20,
  padding = 100,
  className,
  style,
  children,
}: Partial<{
  gap: number;
  padding: number;
  className: string;
  style: React.CSSProperties;
}> & { children: React.ReactNode }) => (
  <div
    className={className}
    style={{
      display: "flex",
      flexDirection: "column",
      gap,
      padding,
      maxWidth: 400,
      ...style,
    }}
  >
    {children}
  </div>
);

export default function TestPage() {
  return (
    <Stack className={pageStyles.stackCompact}>
      {/* Базовый инпут с одной иконкой справа (строковый id подставится в спрайт). */}
      <Input
        label="Email"
        placeholder="Enter email"
        iconRight={<Icon id="icon-clock" />}
      />
      {/* Несколько иконок: оборачиваем в контейнер и передаём один раз в iconRight. */}
      <Input
        label="Category"
        placeholder="Salary"
        iconRight={
          <span style={{ display: "flex", gap: 15 }}>
            <Icon id="icon-calendar" className={pageStyles.iconAccent} />
            <Icon id="icon-clock" />
            <Icon id="icon-clock" />
          </span>
        }
      />

      {/* Классический пароль без иконок. */}
      <Input label="Password" type="password" placeholder="Enter password" />
    </Stack>
  );
}
