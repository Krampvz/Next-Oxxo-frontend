import createProvider from '../../../../actions/providers/create';
import { Button, Input } from '@nextui-org/react';

export default function CreateProviderForm({ onClose }: { onClose: () => void }) {
  return (
    <form
      action={async (formData: FormData) => {
        await createProvider(formData);
        onClose();
      }}
      className="bg-orange-400 rounded-md flex flex-col flex-grow-0 gap-2 p-4"
    >
      <h1 className="text-2xl text-white font-semibold text-center">Crear Proveedor</h1>

      <Input required isRequired label="Nombre del proveedor" placeholder="Proveedor S.A. de C.V." name="providerName" />

      <Input required isRequired label="Correo Electrónico" placeholder="contacto@proveedor.com" name="providerEmail" type="email" />

      <Input required isRequired label="Número de teléfono" placeholder="4421234567" name="providerPhoneNumber" />

      <div className="flex gap-2 justify-end">
        <Button color="default" onPress={onClose}>
          Cancelar
        </Button>
        <Button color="primary" type="submit">
          Crear Proveedor
        </Button>
      </div>
    </form>
  );
}
