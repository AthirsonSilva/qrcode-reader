<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\ScanModel;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    private $scan;

    public function _construct()
    {
        $this->scan = new ScanModel();
    }

    public function getScans()
    {
        $scans = ScanModel::all();

        return response()->json($scans);
    }

    public function postScan(Request $request)
    {
        $query = $this->scan->create([
            'data' => $request->data,
        ]);

        if ($query) {
            return response()->success('Data saved successfully');
        }
        else {
            return response()->failed('Data failed to save');
        }
    }

    public function update(Request $request, $id)
    {
        $query = $this->scan->where('id', $id)->update([
            'data' => $request->data,
        ]);

        if ($query) {
            return response()->success('Data updated successfully');
        }
        else {
            return response()->failed('Data failed to update');
        }
    }

    public function destroy($id)
    {
        $query = $this->scan->where('id', $id)->delete();

        if ($query) {
            return response()->success('Data deleted successfully');
        }
        else {
            return response()->failed('Data failed to delete');
        }
    }
}