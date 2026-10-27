import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  Home, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Send, 
  Calculator,
  ChevronDown,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';
import { crmService } from '../data/crmService';
import { Language } from '../types';

interface PropertyValuationCalculatorProps {
  lang: Language;
  onSuccessClose?: () => void;
  onCancel?: () => void;
}

export interface SpanishProvince {
  id: string;
  name: string;
  region: string;
  basePricePerM2: number;
}

export const SPANISH_PROVINCES: SpanishProvince[] = [
  { id: 'madrid', name: 'Madrid', region: 'Comunidad de Madrid', basePricePerM2: 3750 },
  { id: 'barcelona', name: 'Barcelona', region: 'Catalunya', basePricePerM2: 3550 },
  { id: 'valencia', name: 'Valencia', region: 'Comunitat Valenciana', basePricePerM2: 2050 },
  { id: 'malaga', name: 'Málaga / Costa del Sol', region: 'Andalucía', basePricePerM2: 2850 },
  { id: 'baleares', name: 'Islas Baleares (Mallorca, Ibiza, Menorca)', region: 'Illes Balears', basePricePerM2: 3950 },
  { id: 'sevilla', name: 'Sevilla', region: 'Andalucía', basePricePerM2: 1800 },
  { id: 'alicante', name: 'Alicante / Costa Blanca', region: 'Comunitat Valenciana', basePricePerM2: 1900 },
  { id: 'vizcaya', name: 'Vizcaya / Bilbao', region: 'País Vasco', basePricePerM2: 2950 },
  { id: 'guipuzcoa', name: 'Guipúzcoa / San Sebastián', region: 'País Vasco', basePricePerM2: 4100 },
  { id: 'zaragoza', name: 'Zaragoza', region: 'Aragón', basePricePerM2: 1680 },
  { id: 'tenerife', name: 'Santa Cruz de Tenerife', region: 'Canarias', basePricePerM2: 2150 },
  { id: 'las_palmas', name: 'Las Palmas de Gran Canaria', region: 'Canarias', basePricePerM2: 2100 },
  { id: 'coruna', name: 'A Coruña', region: 'Galicia', basePricePerM2: 1650 },
  { id: 'pontevedra', name: 'Pontevedra / Vigo', region: 'Galicia', basePricePerM2: 1680 },
  { id: 'asturias', name: 'Asturias (Oviedo / Gijón)', region: 'Principado de Asturias', basePricePerM2: 1580 },
  { id: 'cantabria', name: 'Cantabria / Santander', region: 'Cantabria', basePricePerM2: 1980 },
  { id: 'navarra', name: 'Navarra / Pamplona', region: 'Navarra', basePricePerM2: 2200 },
  { id: 'valladolid', name: 'Valladolid', region: 'Castilla y León', basePricePerM2: 1520 },
  { id: 'murcia', name: 'Murcia', region: 'Región de Murcia', basePricePerM2: 1320 },
  { id: 'granada', name: 'Granada', region: 'Andalucía', basePricePerM2: 1620 },
  { id: 'cadiz', name: 'Cádiz', region: 'Andalucía', basePricePerM2: 1880 },
  { id: 'girona', name: 'Girona / Costa Brava', region: 'Catalunya', basePricePerM2: 2450 },
  { id: 'tarragona', name: 'Tarragona', region: 'Catalunya', basePricePerM2: 1580 },
  { id: 'castellon', name: 'Castellón', region: 'Comunitat Valenciana', basePricePerM2: 1380 },
  { id: 'almeria', name: 'Almería', region: 'Andalucía', basePricePerM2: 1350 },
  { id: 'cordoba', name: 'Córdoba', region: 'Andalucía', basePricePerM2: 1420 },
  { id: 'toledo', name: 'Toledo', region: 'Castilla-La Mancha', basePricePerM2: 1180 },
  { id: 'alava', name: 'Álava / Vitoria', region: 'País Vasco', basePricePerM2: 2480 },
  { id: 'badajoz', name: 'Badajoz / Cáceres', region: 'Extremadura', basePricePerM2: 1080 },
  { id: 'otra', name: 'Otras provincias de España', region: 'España', basePricePerM2: 1380 },
];

export const ZONE_TYPES = [
  { id: 'capital', label: 'Centro / Barrio Prime', factor: 1.25, hint: 'Máxima demanda urbana' },
  { id: 'residencial', label: 'Barrio residencial consolidado', factor: 1.00, hint: 'Servicios, comercios y colegios' },
  { id: 'metropolitana', label: 'Área metropolitana / Conurbación', factor: 0.90, hint: 'Buena conexión con capital' },
  { id: 'costa', label: 'Zona costera / Turística', factor: 1.20, hint: 'Cerca de playa / segunda residencia' },
  { id: 'mediana', label: 'Ciudad mediana / Municipio comarcal', factor: 0.80, hint: 'Entorno comarcal autónomo' },
  { id: 'rural', label: 'Población pequeña o semi-rural', factor: 0.65, hint: 'Tranquilidad y espacio abierto' },
];

export const PROPERTY_TYPES = [
  { id: 'piso', label: 'Piso / Apartamento', factor: 1.00 },
  { id: 'atico', label: 'Ático con terraza', factor: 1.25 },
  { id: 'duplex', label: 'Dúplex / Bajo con jardín', factor: 1.10 },
  { id: 'chalet_adosado', label: 'Chalet adosado / pareado', factor: 1.05 },
  { id: 'chalet_independiente', label: 'Chalet independiente', factor: 1.22 },
  { id: 'casa_pueblo', label: 'Casa de pueblo', factor: 0.85 },
];

export const CONDITIONS = [
  { 
    id: 'a_reformar', 
    label: 'A reformar integralmente', 
    badge: 'Mayor potencial Inversa',
    desc: 'Instalaciones obsoletas, suelos/baños antiguos o para demoler', 
    factor: 0.74, 
    upliftPotential: 0.44,
    renoCostPerM2: 750
  },
  { 
    id: 'actualizar', 
    label: 'Necesita actualización parcial', 
    badge: 'Gran margen de mejora',
    desc: 'Habitable pero cocina, baños o instalaciones de origen', 
    factor: 0.88, 
    upliftPotential: 0.28,
    renoCostPerM2: 440
  },
  { 
    id: 'buen_estado', 
    label: 'Buen estado / Conservado', 
    badge: 'Puesta a punto',
    desc: 'Bien cuidado, carpinterías funcionales y listo para entrar a vivir', 
    factor: 1.00, 
    upliftPotential: 0.16,
    renoCostPerM2: 220
  },
  { 
    id: 'reformado', 
    label: 'Reformado recientemente / Como nuevo', 
    badge: 'Estilismo comercial',
    desc: 'Diseño contemporáneo, altas calidades y eficiencia energética', 
    factor: 1.18, 
    upliftPotential: 0.08,
    renoCostPerM2: 110
  },
];

export const PropertyValuationCalculator: React.FC<PropertyValuationCalculatorProps> = ({
  lang,
  onSuccessClose,
  onCancel,
}) => {
  // Calculator state
  const [provinceId, setProvinceId] = useState<string>('madrid');
  const [zoneType, setZoneType] = useState<string>('residencial');
  const [propertyType, setPropertyType] = useState<string>('piso');
  const [sqm, setSqm] = useState<number>(85);
  const [conditionId, setConditionId] = useState<string>('actualizar');
  const [rooms, setRooms] = useState<number>(3);
  const [baths, setBaths] = useState<number>(2);

  // Extras
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasTerrace, setHasTerrace] = useState<boolean>(true);
  const [hasGarage, setHasGarage] = useState<boolean>(false);
  const [hasStorage, setHasStorage] = useState<boolean>(false);
  const [isExterior, setIsExterior] = useState<boolean>(true);
  const [hasClima, setHasClima] = useState<boolean>(true);

  // Toggle form view underneath
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Lead contact form state
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    timePreference: 'Mañanas (09:00 - 14:00)',
    notes: '',
  });

  // Calculations
  const selectedProvince = SPANISH_PROVINCES.find((p) => p.id === provinceId) || SPANISH_PROVINCES[0];
  const selectedZone = ZONE_TYPES.find((z) => z.id === zoneType) || ZONE_TYPES[1];
  const selectedPropertyType = PROPERTY_TYPES.find((pt) => pt.id === propertyType) || PROPERTY_TYPES[0];
  const selectedCondition = CONDITIONS.find((c) => c.id === conditionId) || CONDITIONS[1];

  const valuationResults = useMemo(() => {
    const baseM2 = selectedProvince.basePricePerM2 * selectedZone.factor * selectedPropertyType.factor;
    
    // Extras percentages and fixed values
    let extrasPct = 0;
    if (hasElevator && (propertyType === 'piso' || propertyType === 'atico' || propertyType === 'duplex')) {
      extrasPct += 0.12;
    }
    if (hasTerrace) extrasPct += 0.08;
    if (isExterior) extrasPct += 0.05;
    if (hasClima) extrasPct += 0.04;

    let extrasFixed = 0;
    if (hasGarage) {
      // Garage price scaled by province
      const garageVal = selectedProvince.basePricePerM2 > 3000 ? 25000 : selectedProvince.basePricePerM2 > 2000 ? 18000 : 12000;
      extrasFixed += garageVal;
    }
    if (hasStorage) {
      extrasFixed += 5000;
    }

    // 1. Current As-Is Market Value
    const currentPricePerM2 = Math.round(baseM2 * selectedCondition.factor * (1 + extrasPct));
    const estimatedCurrentValue = Math.round(sqm * currentPricePerM2 + extrasFixed);
    const currentMin = Math.round(estimatedCurrentValue * 0.94);
    const currentMax = Math.round(estimatedCurrentValue * 1.06);

    // 2. Transformed Market Value with Inversa (High-Efficiency renovation + Home staging)
    const transformedPricePerM2 = Math.round(baseM2 * 1.18 * (1 + extrasPct));
    const estimatedTransformedValue = Math.round(sqm * transformedPricePerM2 + extrasFixed);
    const transformedMin = Math.round(estimatedTransformedValue * 0.95);
    const transformedMax = Math.round(estimatedTransformedValue * 1.05);

    // 3. Estimated Renovation Cost (PRESTO basis + 21% IVA)
    const netReno = Math.round(sqm * selectedCondition.renoCostPerM2);
    const renoWithIva = Math.round(netReno * 1.21);

    // 4. Net Profit Surge
    const netProfitGain = estimatedTransformedValue - estimatedCurrentValue - renoWithIva;

    return {
      currentPricePerM2,
      estimatedCurrentValue,
      currentMin,
      currentMax,
      estimatedTransformedValue,
      transformedMin,
      transformedMax,
      renoWithIva,
      netProfitGain,
    };
  }, [
    selectedProvince,
    selectedZone,
    selectedPropertyType,
    selectedCondition,
    sqm,
    hasElevator,
    hasTerrace,
    hasGarage,
    hasStorage,
    isExterior,
    hasClima,
    propertyType
  ]);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedSummary = `[VALORACIÓN CALCULADORA WEB] 
Provincia: ${selectedProvince.name} (${selectedProvince.region})
Zona: ${selectedZone.label}
Tipología: ${selectedPropertyType.label}
Superficie: ${sqm} m² (${rooms} hab, ${baths} baños)
Estado actual: ${selectedCondition.label}
Extras: ${hasElevator ? 'Ascensor, ' : ''}${hasTerrace ? 'Terraza, ' : ''}${hasGarage ? 'Garaje, ' : ''}${hasStorage ? 'Trastero, ' : ''}${isExterior ? 'Exterior, ' : ''}${hasClima ? 'Climatización' : ''}
---
Valoración actual estimada: ${valuationResults.estimatedCurrentValue.toLocaleString('es-ES')} € (${valuationResults.currentPricePerM2.toLocaleString('es-ES')} €/m²)
Potencial transformado Inversa: ${valuationResults.estimatedTransformedValue.toLocaleString('es-ES')} €
Inversión obra estimada (IVA 21%): ${valuationResults.renoWithIva.toLocaleString('es-ES')} €
Plusvalía neta estimada: +${valuationResults.netProfitGain.toLocaleString('es-ES')} €
Horario preferido: ${contactData.timePreference}`;

    crmService.saveLead({
      clientType: 'vendedor',
      name: contactData.name,
      phone: contactData.phone,
      email: contactData.email,
      address: contactData.address || `${selectedProvince.name}, ${selectedZone.label}`,
      city: selectedProvince.name,
      propertyType: `${selectedPropertyType.label} ${sqm} m² - ${selectedCondition.label}`,
      estimatedValue: valuationResults.estimatedCurrentValue,
      estimatedRenoBudget: valuationResults.renoWithIva,
      serviceInterest: `Valoración In Situ · ${sqm}m² en ${selectedProvince.name} (${valuationResults.estimatedCurrentValue.toLocaleString('es-ES')}€)`,
      source: 'Calculadora Valoración de Vivienda en Toda España',
      message: `${contactData.notes ? contactData.notes + '\n\n' : ''}${formattedSummary}`,
      prestoAcknowledged: true,
      initialNote: `Solicitud de inspección técnica in situ generada desde la calculadora web. Valor actual est: ${valuationResults.estimatedCurrentValue.toLocaleString('es-ES')}€. Potencial reformado: ${valuationResults.estimatedTransformedValue.toLocaleString('es-ES')}€.`,
    });

    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="py-12 px-6 text-center space-y-5 max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-in zoom-in-90 duration-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
            ¡Solicitud de Valoración In Situ Recibida!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Hemos registrado la estimación de tu inmueble en <strong>{selectedProvince.name}</strong> ({sqm} m² · Valor orientativo: {valuationResults.estimatedCurrentValue.toLocaleString('es-ES')} €).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Próximos pasos con Agencia Inmobiliaria Inversa:</span>
          </div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 pl-5 list-disc text-[11px]">
            <li>Un técnico o arquitecto colegiado revisará los datos catastrales de tu zona.</li>
            <li>Te contactaremos en <strong>menos de 24 horas</strong> en el horario indicado ({contactData.timePreference}).</li>
            <li>Coordinaremos la visita presencial con distanciómetro láser para verificar mediciones y partidas de obra.</li>
          </ul>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          {onSuccessClose && (
            <button
              type="button"
              onClick={onSuccessClose}
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-900/20 transition-colors"
            >
              Entendido y Cerrar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50/50 dark:from-sky-950/40 dark:via-slate-900 dark:to-sky-950/20 border border-sky-200/80 dark:border-sky-800/40 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Calculator className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-bold text-slate-900 dark:text-white text-sm">
            Calculadora de Valoración de Vivienda en Toda España
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Calcula al instante el <strong>valor de mercado actual</strong> de tu vivienda según provincia y tipología, y descubre el <strong>potencial de revalorización por transformación</strong> que solo ofrece Agencia Inmobiliaria Inversa.
          </p>
        </div>
      </div>

      {/* CALCULATOR FORM CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* 1. Provincia en España */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Provincia / Ubicación en España</span>
          </label>
          <div className="relative">
            <select
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors appearance-none cursor-pointer"
            >
              {SPANISH_PROVINCES.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name} ({prov.region}) — ~{prov.basePricePerM2.toLocaleString('es-ES')} €/m²
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* 2. Tipo de Zona / Población */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Entorno y Tipo de Población</span>
          </label>
          <div className="relative">
            <select
              value={zoneType}
              onChange={(e) => setZoneType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors appearance-none cursor-pointer"
            >
              {ZONE_TYPES.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* 3. Tipología de Inmueble */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Tipología de Vivienda</span>
          </label>
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors appearance-none cursor-pointer"
            >
              {PROPERTY_TYPES.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Surface Slider & Rooms Row */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Ruler className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Superficie Construida / Útil</span>
            </label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Desplaza el control o ajusta los metros cuadrados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-inner">
              <input
                type="number"
                min={30}
                max={400}
                value={sqm}
                onChange={(e) => setSqm(Math.max(30, Math.min(400, Number(e.target.value) || 30)))}
                className="w-14 text-right font-mono font-bold text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none"
              />
              <span className="text-xs font-bold text-slate-500 ml-1">m²</span>
            </div>
            
            {/* Quick presets */}
            <div className="hidden sm:flex items-center gap-1">
              {[60, 85, 110, 150].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSqm(preset)}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                    sqm === preset 
                      ? 'bg-sky-600 text-white border-sky-600' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {preset}m²
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Range slider */}
        <div className="space-y-1">
          <input
            type="range"
            min={35}
            max={300}
            step={5}
            value={sqm}
            onChange={(e) => setSqm(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>35 m²</span>
            <span>100 m²</span>
            <span>200 m²</span>
            <span>300+ m²</span>
          </div>
        </div>

        {/* Rooms and Baths */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Dormitorios:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRooms(num)}
                  className={`w-8 h-7 text-xs font-bold rounded-lg border transition-colors ${
                    rooms === num 
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {num === 5 ? '5+' : num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Cuartos de baño:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBaths(num)}
                  className={`w-8 h-7 text-xs font-bold rounded-lg border transition-colors ${
                    baths === num 
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {num === 4 ? '4+' : num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Estado de Conservación de la Vivienda */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Estado de Conservación Actual</span>
          </span>
          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
            {selectedCondition.badge}
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CONDITIONS.map((cond) => {
            const isSelected = conditionId === cond.id;
            return (
              <button
                key={cond.id}
                type="button"
                onClick={() => setConditionId(cond.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 dark:border-sky-500 text-slate-900 dark:text-white ring-1 ring-sky-500 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {cond.label}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {cond.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Extras y Revalorización */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
          Características adicionales que revalorizan el inmueble:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: 'Ascensor', state: hasElevator, setState: setHasElevator, tag: '+12%' },
            { label: 'Terraza / Balcón', state: hasTerrace, setState: setHasTerrace, tag: '+8%' },
            { label: 'Plaza Garaje', state: hasGarage, setState: setHasGarage, tag: '+Garaje' },
            { label: 'Trastero', state: hasStorage, setState: setHasStorage, tag: '+5k€' },
            { label: 'Ext. Luminoso', state: isExterior, setState: setIsExterior, tag: '+5%' },
            { label: 'Climatización', state: hasClima, setState: setHasClima, tag: '+4%' },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => item.setState(!item.state)}
              className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                item.state
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm font-bold'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div>{item.label}</div>
              <span className={`text-[10px] block mt-0.5 ${item.state ? 'text-sky-100' : 'text-slate-400'}`}>
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS DISPLAY: COMPARISON (VALOR TAL CUAL vs POTENCIAL TRANSFORMACIÓN) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl bg-white dark:bg-slate-900 transition-colors">
        
        {/* Results Header */}
        <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                Resultado de la Valoración Estimada
              </span>
              <span className="text-xs text-slate-300">
                {selectedProvince.name} · {selectedPropertyType.label} {sqm} m² ({selectedZone.label})
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">Baremos de Mercado Español</span>
          </div>
        </div>

        {/* Comparative 2-Column Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-950/40">
          
          {/* Card 1: Valor Actual Tal Como Está */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                1. Valor Actual de Mercado
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Tal como está
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif">
                {valuationResults.estimatedCurrentValue.toLocaleString('es-ES')} €
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rango estimado: <strong>{valuationResults.currentMin.toLocaleString('es-ES')} €</strong> - <strong>{valuationResults.currentMax.toLocaleString('es-ES')} €</strong>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Precio medio estimado por m²:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {valuationResults.currentPricePerM2.toLocaleString('es-ES')} €/m²
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estado evaluado:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {selectedCondition.label}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Potencial Transformado con Agencia Inmobiliaria Inversa */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500/10 via-white to-sky-50 dark:from-sky-950/50 dark:via-slate-900 dark:to-sky-900/30 border-2 border-sky-500/40 shadow-md space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>2. Potencial con Inversa</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white shadow-sm">
                Transformación
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-700 dark:text-sky-300 font-serif">
                {valuationResults.estimatedTransformedValue.toLocaleString('es-ES')} €
              </div>
              <p className="text-xs text-sky-800 dark:text-sky-200">
                Rango potencial: <strong>{valuationResults.transformedMin.toLocaleString('es-ES')} €</strong> - <strong>{valuationResults.transformedMax.toLocaleString('es-ES')} €</strong>
              </p>
            </div>

            <div className="pt-2 border-t border-sky-200/60 dark:border-sky-800/60 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Inversión orientativa en reforma (IVA 21%):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ~{valuationResults.renoWithIva.toLocaleString('es-ES')} €
                </span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Beneficio neto adicional para ti:</span>
                </span>
                <span className="font-mono text-sm">
                  +{valuationResults.netProfitGain.toLocaleString('es-ES')} €
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Technical Rigor Notice */}
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 border-t border-amber-200 dark:border-amber-900/40 flex items-start gap-2.5 text-[11px] text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Aviso de rigor técnico:</strong> Esta estimación está calculada a partir de los datos medios de transacciones registrales en {selectedProvince.name}. Ninguna valoración online sustituye la inspección física in situ obligatoria de un técnico colegiado para revisar patologías, vigas y calidades.
          </p>
        </div>
      </div>

      {/* --- EL BOTÓN DEL FORMULARIO DEBAJO --- */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        {!showForm ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white text-center space-y-4 shadow-xl">
            <div className="max-w-xl mx-auto space-y-1.5">
              <h4 className="text-lg sm:text-xl font-bold font-serif">
                ¿Quieres confirmar esta valoración con una inspección técnica in situ?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nuestros arquitectos y tasadores colegiados visitarán tu vivienda en <strong>{selectedProvince.name}</strong> sin compromiso. Comprobaremos superficie láser, planos y emitiremos el dossier oficial.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>SOLICITAR INFORME TÉCNICO Y VALORACIÓN IN SITU</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400">
              Servicio para propietarios en toda España · Sin compromiso · Respuesta en &lt; 24h
            </p>
          </div>
        ) : (
          /* FORMULARIO DESPLEGADO */
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-sky-500/40 shadow-xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  <span>Datos de la Calculadora Precargados ({selectedProvince.name} · {sqm} m²)</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                  Formulario Oficial de Solicitud de Valoración In Situ
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Introduce tus datos de contacto para que el técnico asignado en tu zona coordine la visita.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Ocultar formulario
              </button>
            </div>

            <form onSubmit={handleSubmitLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Ej. Juan Gómez Álvarez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono de contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="Ej. +34 612 345 678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Dirección exacta del inmueble (Calle y Número) *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.address}
                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                    placeholder={`Ej. Calle Mayor 12, 3º B (${selectedProvince.name})`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Horario preferido para la llamada técnica
                  </label>
                  <select
                    value={contactData.timePreference}
                    onChange={(e) => setContactData({ ...contactData, timePreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Mañanas (09:00 - 14:00)">Mañanas (09:00 - 14:00)</option>
                    <option value="Mediodía (14:00 - 16:30)">Mediodía (14:00 - 16:30)</option>
                    <option value="Tardes (16:30 - 20:00)">Tardes (16:30 - 20:00)</option>
                    <option value="Cualquier momento">Cualquier momento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detalles adicionales (año, estado de la finca, etc.)
                  </label>
                  <input
                    type="text"
                    value={contactData.notes}
                    onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                    placeholder="Ej. Finca con ITE pasada, planta intermedia..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Datos 100% confidenciales (RGPD)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Sin coste ni compromiso de venta</span>
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Volver a la calculadora
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-xs font-bold tracking-wide shadow-md shadow-sky-900/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ENVIAR SOLICITUD DE VALORACIÓN</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
