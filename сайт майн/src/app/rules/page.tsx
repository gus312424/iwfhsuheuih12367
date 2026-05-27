export default function RulesPage() {
  const sections = [
    {
      num: "1",
      title: "Общие положения",
      items: [
        { sub: "1.1", text: "Незнание правил не освобождает от ответственности." },
        { sub: "1.2", text: "Администрация имеет право изменять правила без уведомления." },
        { sub: "1.3", text: "Решение администрации является окончательным." },
        { sub: "1.4", text: "Запрещено использовать уязвимости сервера." },
      ],
    },
    {
      num: "2",
      title: "Общение",
      items: [
        { sub: "2.1", text: "Запрещены оскорбления, токсичность и унижение игроков." },
        { sub: "2.2", text: "Запрещена реклама сторонних проектов." },
        { sub: "2.3", text: "Запрещён спам, флуд и чрезмерный капс." },
        { sub: "2.4", text: "Запрещены угрозы и провокации." },
        { sub: "2.5", text: "Уважай игроков и администрацию." },
      ],
    },
    {
      num: "3",
      title: "Игровой процесс",
      items: [
        { sub: "3.1", text: "Запрещено использование читов и модов, дающих преимущество." },
        { sub: "3.2", text: "Запрещено использование багов и дюпов." },
        { sub: "3.3", text: "Запрещено гриферство." },
        { sub: "3.4", text: "PvP разрешено только по согласию или в специальных зонах." },
        { sub: "3.5", text: "Запрещено мешать игровому процессу других игроков." },
      ],
    },
    {
      num: "4",
      title: "Никнеймы и скины",
      items: [
        { sub: "4.1", text: "Запрещены оскорбительные ники." },
        { sub: "4.2", text: "Запрещена имитация администрации." },
        { sub: "4.3", text: "Запрещён контент 18+." },
        { sub: "4.4", text: "Ник должен соответствовать правилам сервера." },
      ],
    },
    {
      num: "5",
      title: "Экономика",
      items: [
        { sub: "5.1", text: "Запрещён обман игроков." },
        { sub: "5.2", text: "Все сделки совершаются на страх и риск игроков." },
        { sub: "5.3", text: "Запрещена продажа игровых ценностей за реальные деньги вне сайта." },
        { sub: "5.4", text: "Администрация не возвращает утерянные ресурсы." },
      ],
    },
    {
      num: "6",
      title: "Донат",
      items: [
        { sub: "6.1", text: "Донат является добровольным." },
        { sub: "6.2", text: "Донат не даёт неуязвимость." },
        { sub: "6.3", text: "Возврат средств невозможен после активации." },
        { sub: "6.4", text: "При ошибке никнейма — обращаться до выдачи." },
      ],
    },
    {
      num: "7",
      title: "Наказания",
      items: [
        { sub: "7.1", text: "Администрация вправе выдать наказание без предупреждения." },
        { sub: "7.2", text: "Срок наказания определяется тяжестью нарушения." },
        { sub: "7.3", text: "Повторные нарушения усиливают наказание." },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            <span className="text-gradient">Правила сервера</span>
          </h1>
          <p style={{ color: "#7b87a8" }}>
            Ознакомься с правилами перед игрой. Незнание правил не освобождает от ответственности.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.num}
              className="rounded-2xl p-6"
              style={{ background: "rgba(13,17,32,0.9)", border: "1px solid rgba(108,99,255,0.15)" }}
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                  style={{ background: "linear-gradient(135deg,#6c63ff,#4facfe)" }}
                >
                  {section.num}
                </span>
                <span className="text-gradient">{section.title}</span>
              </h2>
              <ul className="space-y-2">
                {section.items.map((rule) => (
                  <li key={rule.sub} className="flex items-start gap-3 text-sm" style={{ color: "#a8b4d8" }}>
                    <span className="font-mono font-bold flex-shrink-0" style={{ color: "#6c63ff", minWidth: "2.5rem" }}>
                      {rule.sub}
                    </span>
                    {rule.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-8 p-5 rounded-2xl text-sm text-center"
          style={{ background: "rgba(252,129,129,0.06)", border: "1px solid rgba(252,129,129,0.2)", color: "#a8b4d8" }}
        >
          Нарушение правил влечёт предупреждение, временный или постоянный бан. Администрация оставляет за собой право на своё усмотрение.
        </div>
      </div>
    </div>
  );
}
