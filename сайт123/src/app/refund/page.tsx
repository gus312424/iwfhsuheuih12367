import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">
            <span className="text-gradient">Политика возврата</span>
          </h1>
          <p style={{ color: "#7b87a8" }}>
            Последнее обновление: 1 января 2025 г.
          </p>
        </div>

        <div className="space-y-6">
          {/* No refund block */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(252,129,129,0.06)",
              border: "1px solid rgba(252,129,129,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} style={{ color: "#fc8181" }} />
              <h2 className="font-bold text-lg">Невозвратные товары</h2>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#a8b4d8" }}>
              В соответствии с{" "}
              <strong style={{ color: "#e8eaf6" }}>
                Законом РФ «О защите прав потребителей» ст. 26.1
              </strong>{" "}
              и пользовательским соглашением, следующие категории товаров{" "}
              <strong style={{ color: "#fc8181" }}>не подлежат возврату</strong> после
              их активации:
            </p>
            <ul className="space-y-2">
              {[
                "Ранги и привилегии (после выдачи на аккаунт)",
                "Донат-валюта (после зачисления на аккаунт)",
                "Кейсы (после открытия и выдачи содержимого)",
                "Шалкеры и предметы (после доставки в игру)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#a8b4d8" }}>
                  <span style={{ color: "#fc8181", flexShrink: 0 }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* When we do refund */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(104,211,145,0.06)",
              border: "1px solid rgba(104,211,145,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={20} style={{ color: "#68d391" }} />
              <h2 className="font-bold text-lg">Когда мы вернём деньги</h2>
            </div>
            <ul className="space-y-2">
              {[
                "Техническая ошибка на нашей стороне — привилегия не была выдана",
                "Двойное списание средств за один заказ",
                "Оплата прошла, но заказ не был создан в системе",
                "Сервер закрыт на неопределённый срок после покупки",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#a8b4d8" }}>
                  <CheckCircle size={12} style={{ color: "#68d391", flexShrink: 0, marginTop: 3 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(13,17,32,0.9)",
              border: "1px solid rgba(108,99,255,0.15)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} style={{ color: "#6c63ff" }} />
              <h2 className="font-bold text-lg">Порядок обращения</h2>
            </div>
            <ol className="space-y-3">
              {[
                "Обратись в Discord-сервер Vexium в канал #поддержка",
                "Укажи номер заказа (из письма или со страницы успешной оплаты)",
                "Опиши проблему и приложи скриншот оплаты",
                "Администрация рассмотрит запрос в течение 24 часов",
                "При подтверждении нашей ошибки — возврат в течение 3–5 рабочих дней",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#a8b4d8" }}>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "rgba(108,99,255,0.15)",
                      border: "1px solid rgba(108,99,255,0.3)",
                      color: "#6c63ff",
                    }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Chargeback warning */}
          <div
            className="p-5 rounded-2xl text-sm"
            style={{
              background: "rgba(237,137,54,0.07)",
              border: "1px solid rgba(237,137,54,0.25)",
              color: "#a8b4d8",
            }}
          >
            <strong style={{ color: "#ed8936" }}>⚠️ Важно: </strong>
            Несанкционированный чарджбек (оспаривание платежа в банке без предварительного
            обращения к нам) является нарушением Пользовательского соглашения и влечёт
            немедленную блокировку аккаунта.
          </div>
        </div>
      </div>
    </div>
  );
}
