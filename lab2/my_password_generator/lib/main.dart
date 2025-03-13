import 'dart:math';
import 'package:flutter/material.dart';

void main() {
  runApp(PasswordGeneratorApp());
}

class PasswordGeneratorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: PasswordGeneratorScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class PasswordGeneratorScreen extends StatefulWidget {
  @override
  _PasswordGeneratorScreenState createState() => _PasswordGeneratorScreenState();
}

class _PasswordGeneratorScreenState extends State<PasswordGeneratorScreen> {
  final _lengthController = TextEditingController(text: '12');
  String _generatedPassword = '';

  void _generatePassword() {
    final length = int.tryParse(_lengthController.text) ?? 12;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#\$%^&*()_+-=[]{}|;:,.<>?';
    final random = Random();

    final password = List.generate(length, (index) {
      return characters[random.nextInt(characters.length)];
    }).join();

    setState(() {
      _generatedPassword = password;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Password Generator')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Password Length:', style: TextStyle(fontSize: 16)),
            TextField(
              controller: _lengthController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(border: OutlineInputBorder(), hintText: 'Enter length'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _generatePassword,
              child: Text('Generate Password'),
            ),
            SizedBox(height: 16),
            Text(
              'Generated Password:',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SelectableText(
              _generatedPassword,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.blue),
            ),
          ],
        ),
      ),
    );
  }
}
