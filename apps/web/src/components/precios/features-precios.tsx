import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCreditCard,
  IconBuildingBank,
  IconShield,
  IconHeadset,
  IconChartBar,
  IconUsers,
} from "@tabler/icons-react";

export function FeaturesPrecios() {
  const features = [
    {
      title: "Pagos seguros",
      description:
        "Procesa pagos de forma segura con la mejor tecnología de encriptación del mercado.",
      icon: <IconShield className="w-6 h-6" />,
    },
    {
      title: "Múltiples métodos de pago",
      description:
        "Acepta pagos con tarjetas de crédito, débito, transferencias y más.",
      icon: <IconCreditCard className="w-6 h-6" />,
    },
    {
      title: "Reportes en tiempo real",
      description:
        "Accede a reportes detallados de tus ventas y transacciones en tiempo real.",
      icon: <IconChartBar className="w-6 h-6" />,
    },
    {
      title: "Integración bancaria",
      description: "Conecta con los principales bancos de México.",
      icon: <IconBuildingBank className="w-6 h-6" />,
    },
    {
      title: "Multi-usuario",
      description: "Administra múltiples usuarios y roles para tu equipo.",
      icon: <IconUsers className="w-6 h-6" />,
    },
    {
      title: "Soporte 24/7",
      description:
        "Atención personalizada las 24 horas del día, los 7 días de la semana.",
      icon: <IconHeadset className="w-6 h-6" />,
    },
    {
      title: "API empresarial",
      description:
        "API robusta y documentada para integraciones personalizadas.",
      icon: <IconCloud className="w-6 h-6" />,
    },
    {
      title: "Personalización total",
      description: "Adapta la plataforma a las necesidades de tu negocio.",
      icon: <IconAdjustmentsBolt className="w-6 h-6" />,
    },
  ];

  return (
    <div className="col-span-2 mt-16">
      <h2 className="text-3xl font-clash-display text-center mb-12">
        Todas las características que necesitas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div className="bg-white dark:bg-black p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="text-cedi-black dark:text-white mb-4">
        {icon}
      </div>
      <h3 className="font-clash-display text-lg mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm font-clash-display text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
