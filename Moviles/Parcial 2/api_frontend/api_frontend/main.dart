import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'src/presentation/viewmodels/producto_viewmodel.dart';
import 'src/domain/usecases/get_productos_usecase.dart';
import 'src/data/repositories/producto_repository_impl.dart';
import 'src/data/datasources/producto_api_datasource.dart';

import 'src/presentation/routes/app_routes.dart';

void main() {
  // Inyección de dependencias
  final dataSource = ProductoApiDataSource();
  final repo = ProductoRepositoryImpl(dataSource);
  final usecase = GetProductosUseCase(repo);

  runApp(MyApp(usecase: usecase));
}

class MyApp extends StatelessWidget {
  final GetProductosUseCase usecase;

  const MyApp({super.key, required this.usecase});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
            create: (_) => ProductoViewModel(usecase)..cargarProductos()),
      ],
      child: MaterialApp(
        title: "Consumo API Flutter",
        routes: AppRoutes.routes,
      ),
    );
  }
}
